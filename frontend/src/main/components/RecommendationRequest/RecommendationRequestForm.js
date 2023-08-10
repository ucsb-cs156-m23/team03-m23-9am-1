import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function RecommendationRequestForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all
   
    const navigate = useNavigate();

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    // Stryker disable next-line Regex
    const email_regex = /^\S+@\S+\.\S+$/;

    const testIdPrefix = "RecommendationRequestForm";

    return (
        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="requesterEmail">Requester Email</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-requesterEmail"}
                    id="requesterEmail"
                    type="text"
                    isInvalid={Boolean(errors.requesterEmail)}
                    {...register("requesterEmail", {
                        required: 'Requester email is required.',
                        pattern: {
                            value: email_regex,
                            message: 'Requester email must be a valid email address.'
                        }
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.requesterEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="professorEmail">Professor Email</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-professorEmail"}
                    id="professorEmail"
                    type="text"
                    isInvalid={Boolean(errors.professorEmail)}
                    {...register("professorEmail", {
                        required: 'Professor email is required.',
                        pattern: {
                            value: email_regex,
                            message: 'Professor email must be a valid email address.'
                        }
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.professorEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="explanation">Explanation</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-explanation"}
                    id="explanation"
                    type="text"
                    isInvalid={Boolean(errors.explanation)}
                    {...register("explanation", {
                         required: 'Explanation is required.'
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.explanation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateRequested">Date Requested (ISO format)</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-dateRequested"}
                    id="dateRequested"
                    type="datetime-local"
                    isInvalid={Boolean(errors.dateRequested)}
                    {...register("dateRequested", {
                        required: 'Date requested is required.',
                        pattern: {
                            value: isodate_regex,
                            message: 'Date requested must be a valid ISO-formatted date.'
                        }
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateRequested?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateNeeded">Date Needed (ISO format)</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-dateNeeded"}
                    id="dateNeeded"
                    type="datetime-local"
                    isInvalid={Boolean(errors.dateNeeded)}
                    {...register("dateNeeded", {
                        required: 'Date needed is required.',
                        pattern: {
                            value: isodate_regex,
                            message: 'Date needed must be a valid ISO-formatted date.'
                        }
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateNeeded?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="done">Done?</Form.Label>
                <Form.Switch
                    data-testid={testIdPrefix + "-done"}
                    id="done" 
                    {...register("done")}
                />
            </Form.Group>

            <Button
                type="submit"
                data-testid={testIdPrefix + "-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default RecommendationRequestForm;